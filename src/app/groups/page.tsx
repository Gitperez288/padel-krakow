export default function GroupsPage() {
  const groups = [
    { name: "WhatsApp Group", desc: "Find partners and organize matches.", link: "https://chat.whatsapp.com/" },
    { name: "Facebook Group", desc: "Events, tournaments, and news.", link: "https://facebook.com/" },
    { name: "Instagram Page", desc: "Photos and updates from local games.", link: "https://instagram.com/" },
  ];

  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">💬 Community Groups</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
        Join our chats and pages to connect with players across Kraków & Małopolska.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {groups.map(({ name, desc, link }) => (
          <a key={name} href={link} target="_blank" rel="noopener noreferrer" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-left">
            <h3 className="text-xl font-bold text-amber-700 mb-2">{name}</h3>
            <p className="text-gray-600">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
