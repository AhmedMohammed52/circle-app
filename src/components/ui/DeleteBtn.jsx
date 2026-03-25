export default function DeleteBtn({ deleteComment }) {
  return (
    <button
      className="text-gray-500 hover:text-red-600 transition-colors duration-200"
      onClick={deleteComment}
    >
      <i className="fa-solid fa-xmark text-lg"></i>
    </button>
  );
}
