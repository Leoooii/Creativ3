"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

interface ModalProps {
  buttonName: string;
  header: string;

  children?: ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  buttonName,
  header,

  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onPress={onOpen}
        variant="solid"
        className={"border-2 border-white"}
      >
        {buttonName}
      </Button>
      <Modal
        isDismissable={false}
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: -5,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "circOut",
              },
            },
            exit: {
              y: 25,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Inchide
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
