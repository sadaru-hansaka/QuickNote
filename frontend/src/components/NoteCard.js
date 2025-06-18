export default function NoteCard({title,content,date}){

    const plainText = content.replace(/<[^>]+>/g, "");
    const preview = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;

    return(
        <div className="bg-white p-4 rounded-xl shadow-sm border w-72">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">{preview}</p>
            <small className="text-xs text-gray-400 block mt-2">{date}</small>
        </div>
    )
}