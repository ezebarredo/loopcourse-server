export default function Modal({ children, isOpen, onClose }) {
  return isOpen ? (
    <div>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : (
    ""
  );
}
