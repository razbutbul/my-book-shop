const authenticateUser = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("authenticateUser middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should return 401 if no token is provided", () => {
    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ code: "NO_TOKEN_PROVIDED" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    req.headers.authorization = "Bearer invalid.token.here";
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ code: "INVALID_TOKEN" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next and set req.user if token is valid", () => {
    req.headers.authorization = "Bearer valid.token";
    const mockDecoded = { userId: 123, role: "user" };
    jwt.verify.mockReturnValue(mockDecoded);

    authenticateUser(req, res, next);

    expect(req.user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
