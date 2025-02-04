"use server";
import { sql } from "@vercel/postgres";

import { Category, Material, RequestType } from "./definitions";

const ITEMS_PER_PAGE = 8;

export async function fetchMaterials(
  currentPage: number,
  minPrice?: number,
  maxPrice?: number,
  category?: string,
  search?: string,
): Promise<{ materialsData: Material[]; totalPages: number }> {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // Query-ul pentru materialele paginate

    let query = sql<Material[]>`
        SELECT * FROM Materials
        WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999}
        ORDER BY price
   
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    let count =
      await sql`SELECT COUNT(*) FROM Materials   WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999}`;

    if (category) {
      console.log(`Searching materials for ${category} 2`);
      query = sql<Material[]>`
        SELECT * FROM Materials
        WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999}
        AND category=${category}
           ORDER BY price
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
         
      `;
      count =
        await sql`SELECT COUNT(*) FROM Materials   WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999}  AND category=${category}`;
    }
    if (search) {
      console.log(`Searching materials for ${search}`);
      query = sql<Material[]>`
        SELECT * FROM Materials
        WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999}
        AND name LIKE ${"%" + search + "%"} 
           ORDER BY price
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
         
      `;
      count =
        await sql`SELECT COUNT(*) FROM Materials   WHERE price >= ${minPrice || 0}
        AND price <= ${maxPrice || 999999} AND name LIKE ${"%" + search + "%"} `;
    }

    // Executarea query-ului pentru materiale
    const materialsData = await query;

    // Aflarea numărului total de pagini

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    // Returnează atât materialele, cât și numărul total de pagini
    // console.log(materialsData.rows.flat())

    return {
      materialsData: materialsData.rows.flat(),
      totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch materials:", error);
    throw new Error("Failed to fetch materials");
  }
}

export async function fetchCategories() {
  try {
    const query = sql<Category[]>`
    SELECT * FROM Categories
  `;

    const materials = await query;

    return materials.rows.flat();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
}

export async function addCategory(name: string) {
  if (!name) {
    throw new Error("All fields are required");
  }
  console.log(name);

  try {
    await sql`
      INSERT INTO Categories (name)
      VALUES (${name});
    `;
    const query = await sql<Category[]>`
    SELECT * FROM Categories
  `;

    console.log(query);

    return { message: "Categorie adaugata cu succes" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add categories");
  }
}

export async function fetchMaterialById(id: string) {
  try {
    const data = await sql<Material>`SELECT * FROM Materials WHERE id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function fetchMaterialByFilter(filter: string, limit: number) {
  try {
    const data = await sql<Material[]>`
      SELECT * 
      FROM Materials 
      WHERE name LIKE ${"%" + filter + "%"} 
      LIMIT ${limit}`;

    // Returnează un singur array de obiecte Material
    return data.rows.flat(); // Folosește .flat() pentru a plana un array de array-uri
  } catch (error) {
    console.log(error, "failed to fetchMaterialByFilter");
    return []; // Returnează un array gol în caz de eroare
  }
}

export async function addMaterial(
  name: string,
  price: string,
  image_url: string,
  description: string,
  available: boolean,
  category: string,
  unit: string,
) {
  if (
    !name ||
    !price ||
    !image_url ||
    !description ||
    !available ||
    !category ||
    !unit
  ) {
    throw new Error("All fields are required");
  }
  console.log(name, price, image_url, description, available, category);

  try {
    await sql`
      INSERT INTO Materials (name, price, image_url,description,available,category,unit)
      VALUES (${name}, ${Number(price)}, ${image_url},${description},${available},${category},${unit});
    `;
    // await sql<Material>`SELECT * FROM Materials`;

    return { message: "Material adaugat cu succes" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add material");
  }
}

export async function updateMaterial(
  id: number,
  name: string,
  price: number,
  description: string,
  category: string,
) {
  if (!id || !name || !price || !description || !category) {
    throw new Error("ID, name, price are required");
  }
  console.log("descrierea noua", description);

  try {
    const result = await sql`
      UPDATE Materials
      SET name = ${name}, price = ${price}, description=${description}, category=${category}
      WHERE id = ${id};
    `;

    // Verifică numărul de rânduri afectate
    if (result.rowCount === 0) {
      return { error: "Material not found" };
    }

    // alert('Ati reusit sa modificati materialul')
    return { message: "Material actualizat cu succes" };
  } catch (error) {
    console.error("Failed to update material:", error);
    throw new Error("Failed to update material");
  }
}

export async function deleteMaterial(id: number) {
  if (!id) {
    throw new Error("ID is required");
  }

  try {
    const result = await sql`
      DELETE FROM Materials
      WHERE id = ${id};
    `;

    // Verifică numărul de rânduri afectate
    if (result.rowCount === 0) {
      return { error: "Material not deleted" };
    }

    return { message: "Material sters cu succes" };
  } catch (error) {
    console.error("Failed to delete material:", error);
    throw new Error("Failed to delete material");
  }
}

export async function addRequest(
  items: { id: number; count: number }[],
  message: string,
  email: string,
  status: string,
) {
  try {
    await sql`
  INSERT INTO Request (items, message, email, status)
  VALUES (${JSON.stringify(items)}, ${message}, ${email}, ${status});
`;

    const data = await sql<Request>`SELECT * FROM Request `;

    // console.log(data.rows, 'baa')

    return { message: "Cerere de oferta realizata cu succes", data: data.rows };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add request");
  }
}

export async function fetchRequests(email: string, filter?: string) {
  try {
    let query;

    switch (filter) {
      case "all":
        query = sql<RequestType[]>`
    SELECT * FROM Request 
  `;
        break;
      case "pending":
        query = sql<RequestType[]>`
    SELECT * FROM Request WHERE status='pending'
  `;
        break;

      default:
        query = sql<RequestType[]>`
    SELECT * FROM Request WHERE email=${email}
  `;
    }
    const requests = await query;

    // console.log(requests.rows.flat(), "2");
    console.log(requests);
    return requests.rows.flat();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch requestss");
  }
}

export async function updateRequest(
  id: number,
  answer: string,
  status: string,
) {
  if (!id || !answer || !status) {
    throw new Error("ID, answer,status are required");
  }

  try {
    const result = await sql`
      UPDATE Request
      SET answer = ${answer}, status = ${status}
      WHERE id = ${id};
    `;

    console.log(answer, status, id);

    // Verifică numărul de rânduri afectate
    if (result.rowCount === 0) {
      return { error: "Material not updated" };
    }

    return { message: "Material actualizat cu succes" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update request");
  }
}

export async function deleteRequest(id: number) {
  try {
    const result = await sql`
      DELETE FROM Request
      WHERE id = ${id};
    `;

    // Verifică numărul de rânduri afectate
    if (result.rowCount === 0) {
      return { error: "Request not deleted" };
    }

    return { message: "Material sters cu succes" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete request");
  }
}
