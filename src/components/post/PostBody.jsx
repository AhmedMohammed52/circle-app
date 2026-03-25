export default function PostBody({
  caption,
  image,
  isEditing,
  setCaption,
  onUpdate,
  onCancel,
}) {
  return (
    <div className="px-4">
      {isEditing ? (
        <>
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={onUpdate}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={onCancel}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-700 text-[15px] leading-snug pb-3">
            {caption}
          </p>

          {image && (
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={image}
                alt="Post content"
                className="w-full h-auto object-cover max-h-100 block"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
