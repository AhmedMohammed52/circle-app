import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export default function DeleteModal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(internalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

            <ModalBody>
              <p>{message}</p>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={internalClose}>
                Cancel
              </Button>

              <Button
                color="danger"
                onPress={() => {
                  onConfirm();
                  internalClose();
                }}
              >
                Confirm Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
