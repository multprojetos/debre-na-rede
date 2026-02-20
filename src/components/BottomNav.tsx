import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Newspaper, Users, BarChart2, MoreHorizontal } from 'lucide-react'

const tabs = [
    { path: '/home', icon: Home, label: 'Início' },
    { path: '/news', icon: Newspaper, label: 'Notícias' },
    { path: '/elenco', icon: Users, label: 'Elenco' },
    { path: '/stats', icon: BarChart2, label: 'Stats' },
    { path: '/menu', icon: MoreHorizontal, label: 'Mais' },
]

export default function BottomNav() {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <nav className="bottom-nav">
            {tabs.map(({ path, icon: Icon, label }) => (
                <button
                    key={path}
                    className={`nav-item ${pathname === path || (path !== '/home' && pathname.startsWith(path)) ? 'active' : ''}`}
                    onClick={() => navigate(path)}
                >
                    <Icon size={22} strokeWidth={2} />
                    <span>{label}</span>
                </button>
            ))}
        </nav>
    )
}
