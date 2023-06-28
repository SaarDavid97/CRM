import genericLogo from '../images/genericLogo.jpg'

export default function LogoDisplay({logo}) {
    return (
        <div className='logo-container'>
            <div className='client-logo'>
                <img src={logo ? logo : genericLogo}/>
            </div>
        </div>
    )
}

