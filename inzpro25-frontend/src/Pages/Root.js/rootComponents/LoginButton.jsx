import { useAuth0 } from "@auth0/auth0-react";


function LoginButton({setIsLoggedIn}){
    // const {login, isAuthenticated} = useCustomAuth0();
    const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();
    

    const handleLogin =()=>{
        loginWithRedirect();
    }

    return(<div>
            <button onClick={()=>{loginWithRedirect()
            }}>
                Sign In
            </button>
            <button onClick={()=>logout({ logoutParams: { returnTo: "http://localhost:3000/login" } })}>
                Logout
            </button>
        </div>
            
    
    )

}

export default LoginButton;