import { motion } from "framer-motion";

interface Props {
  type: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
}

export function Toast({ type = "tip", label, onClick }: Props) {
  return (
    <motion.div
      initial={{ x: 530 }}
      animate={{ x: 0 }}
      exit={{ x: 530 }}
      className="text-center pb-4 pr-4 fixed right-0 bottom-0 z-20"
    >
      <button
        className="py-2 px-4 bg-black border-2 border-yellow-500 items-center text-yellow-500 leading-none rounded-full flex inline-flex space-x-2 focus:outline-none focus:shadow-outline"
        role="alert"
        onClick={onClick}
      >
        <span className="flex rounded-full bg-yellow-500 text-black uppercase px-2 py-1 text-xs font-bold">
          {type}
        </span>
        <span className="font-semibold text-left flex-auto">{label}</span>
        <svg className="fill-current opacity-75 h-4 w-4" viewBox="0 0 20 20">
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </button>
    </motion.div>
  );
}
