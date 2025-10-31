import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1005] flex items-center justify-center p-4"
          onClick={() => onOpenChange(false)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ children, className = "", ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className || "w-full max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
    >
        {children}
    </motion.div>
));
DialogContent.displayName = "DialogContent";


const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
    <div ref={ref} className="p-6 border-b border-gray-200" {...props}>
        {children}
    </div>
));
DialogHeader.displayName = "DialogHeader";


const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ children, className, ...props }, ref) => (
    <h2 ref={ref} className="text-2xl font-bold text-green-700" {...props}>
        {children}
    </h2>
));
DialogTitle.displayName = "DialogTitle";


export { Dialog, DialogContent, DialogHeader, DialogTitle }
