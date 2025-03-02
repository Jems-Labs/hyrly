import { Link, useNavigate } from 'react-router-dom'
import logo from '/hyrly_nobg.png'
import { Button } from './ui/button'
import { useApp } from '@/stores/useApp';
import { Avatar, AvatarFallback } from './ui/avatar';

function Navbar() {
    const navigate = useNavigate();
    const { user } = useApp();
    return (
        <div className="border-b px-4 py-2 flex items-center justify-between">
            <Link className=' cursor-pointer' to="/">
                <img src={logo} className="w-24" />
            </Link>
            {user ? <div>
                <Avatar className='cursor-pointer'>
                    <AvatarFallback>{user?.firstName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </div> :
                <div className='flex items-center gap-2'>
                    <Button variant={'outline'} onClick={() => navigate("/login")}>Login</Button>
                    <Button onClick={() => navigate("/signup")}>Signup</Button>
                </div>
            }
        </div>
    )
}

export default Navbar