import { UserModel } from "./models/UserModel";
import { hashText } from "./utils/bcrypt";

const createTestUser = async () => {
    try {
        const user = await UserModel.findOne({ email: "Test@test.test" });
        if (user) {
            console.log("Test user already exists: ", user)
        } else {
            const testUserPassword = "Test@123"
            const hashedPw = await hashText(testUserPassword)
            const testUser = new UserModel({
                name: "Test Name",
                email: "Test@test.test",
                password: hashedPw,
            });
            const createdUser = await UserModel.create(testUser);
            if (createdUser) {
                console.log("User created: ", createdUser)
            } else {
                console.log("Something went wrong on create testing user: ", createdUser)
            }

        }
    } catch (error) {
        console.log("Error on create test user:", error);
    }
}

export default createTestUser;
