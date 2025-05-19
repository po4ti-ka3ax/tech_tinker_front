import ProtectedMiddleware from "../components/middleware/middleware";

const Profile = () => {
    return (
        <>
            <ProtectedMiddleware>
                <h1>profile</h1>
            </ProtectedMiddleware>
        </>
    );
}

export default Profile