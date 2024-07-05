export default function Modal({ children, isOpen, onClose }) {
  return isOpen ? (
    <div className="modal">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : (
    ""
  );
}
