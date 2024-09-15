import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from 'lucide-react';

interface CongratulationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CongratulationsDialog({ isOpen, onClose }: CongratulationsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Congratulations!</DialogTitle>
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
          <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
          <p className="mb-4">Thank you for registering for IDTAI 2024.</p>
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 mr-2" />
              Check Your Email
            </h4>
            <p className="text-sm">
              Your attendance badge will be delivered to your email within the next few minutes.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={onClose} className="px-8">
              Got it!
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}