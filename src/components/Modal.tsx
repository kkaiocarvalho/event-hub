import { CloseIcon, Icon, ModalBackdrop, ModalCloseButton } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { Modal as GlueModal } from "@gluestack-ui/themed";
import { PropsWithChildren } from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    withCloseButton?: boolean;
} & PropsWithChildren;

export function Modal({ isOpen, onClose, title, withCloseButton = false,
    children, }: ModalProps) {

    return (
        <GlueModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">{title}</Heading>
                    {withCloseButton ? (<ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>) : null}

                </ModalHeader>
                {children}
            </ModalContent>
        </GlueModal>
    )
}