import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={!loading ? onCancel : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xs rounded-2xl border border-primary/10 bg-surface-container-high p-6 shadow-xl shadow-black/40"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            <h3 className="text-lg font-bold text-on-surface">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {message}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 rounded-xl bg-surface-container py-3 text-sm font-semibold text-on-surface/70 transition-colors active:bg-input disabled:opacity-40"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-button-text transition-colors active:bg-primary-container disabled:opacity-60"
              >
                {loading ? "Cargando..." : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
