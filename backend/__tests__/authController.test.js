const { login } = require("../controllers/authController");
const { getUserByEmail } = require("../dal/authDAL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../dal/authDAL");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("authController - login", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@gmail.com",
        password: "111111",
        requestedRole: "user",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 401 if user not found", async () => {
    getUserByEmail.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ code: "INVALID_CREDENTIALS" });
  });

  it("should return 401 if password is incorrect", async () => {
    getUserByEmail.mockResolvedValue({
      id: 1,
      password: "encryptedPassword",
      role: "user",
    });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ code: "INVALID_CREDENTIALS" });
  });

  it("should return 403 if role mismatch", async () => {
    getUserByEmail.mockResolvedValue({
      id: 1,
      password: "encryptedPassword",
      role: "admin",
    });
    bcrypt.compare.mockResolvedValue(true);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ code: "ROLE_MISMATCH" });
  });

  it("should return token and user on success", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "encryptedPassword",
      role: "user",
      userName: "Test User",
    };
    getUserByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    await login(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.id, role: mockUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    expect(res.json).toHaveBeenCalledWith({
      token: "fake-jwt-token",
      user: {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        userName: mockUser.userName,
      },
    });
  });
});
