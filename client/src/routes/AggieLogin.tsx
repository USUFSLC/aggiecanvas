import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AggieLogin = () => {
  const [anumber, setAnumber] = useState("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { client } = useAggieCanvasClient();
  const { refreshUser } = useAuthContext();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    client.postAuthAggie(null, { anumber }).then(() => {
      setSubmit(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Welcome.</h2>
      <p style={{ textAlign: "center" }}>Please sign in.</p>
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
        <button aria-busy={!!loading} type="submit">
          Submit
        </button>
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
