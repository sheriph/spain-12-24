import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface InvitationCongratulationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationCongratulationsDialog({
  isOpen,
  onClose,
}: InvitationCongratulationsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Invitation Request Submitted!
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">
            Thank you for your request!
          </h3>
          <p className="mb-4">
            Your invitation letter will be sent to your email shortly.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={onClose} className="px-8">
              Got it!
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}