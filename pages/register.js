import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";
import Alert from "@/components/Alert";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    const res = await registerUser(user, password, password2);
    if (res) {
      router.push("/login");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          {error && <Alert message={error} />}
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
