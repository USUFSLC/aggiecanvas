import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AggieLogin = () => {
  const [anumber, setAnumber] = useState("");
  const [submit, setSubmit] = useState<boolean>(false);

  const { client } = useAggieCanvasClient();
  const { refreshUser } = useAuthContext();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    client.postAuthAggie(null, { anumber }).then(() => setSubmit(true));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Login</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="a01234567"
          type="text"
          autoComplete="off"
          onChange={(e) => setAnumber(e.target.value)}
          value={anumber}
          aria-invalid={!anumber.match(/^a[0-9]{8}$/i)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      {submit ? (
        <div>
          <p>Please check your USU email for further instructions.</p>
        </div>
      ) : (
        <div>
          <Link to="/grids">Browse as a guest</Link>
        </div>
      )}
    </div>
  );
};
