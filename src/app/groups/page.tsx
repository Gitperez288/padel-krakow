// app/groups/page.tsx
export default function GroupsPage() {
  const groups = [
    { name: "WhatsApp Group", desc: "Join our active chat to find partners and matches.", link: "https://chat.whatsapp.com/" },
    { name: "Facebook Group", desc: "Stay up to date with events, tournaments, and community news.", link: "https://facebook.com/" },
    { name: "Instagram Page", desc: "Follow us for updates and photos from local games.", link: "https://instagram.com/" },
  ];

  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">💬 Community Groups</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
        Connect with Padel players from Kraków and Małopolska.  
        Join our groups and stay in touch with the community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {groups.map(({ name, desc, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-left"
          >
            <h3 className="text-xl font-bold text-amber-700 mb-2">{name}</h3>
            <p className="text-gray-600">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
