export default function Modal({ children, isOpen, onClose }) {
  return isOpen ? (
    <div className="modal">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{ width: "50px", borderRadius: "100%" }}
          onClick={onClose}
        >
          <strong>X</strong>
        </button>
      </div>
      {children}
    </div>
  ) : (
    ""
  );
}
