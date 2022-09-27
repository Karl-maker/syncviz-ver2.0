import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VirtualSpace from "../classes/virtual-space";
import GridLayout from "../template/layout/grid-layout";
import Preview from "../components/preview";
import { Pagination, Typography } from "@mui/material";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { Helmet } from "react-helmet";

export default function SearchVirtualPage() {
  const [searchParams] = useSearchParams();
  const [metaverseRooms, setMetaverseRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const q = searchParams.get("q");
    VirtualSpace.searchMetaverseRooms(q, { page }).then((results) => {
      if (results) setMetaverseRooms(results.virtual_rooms);
      if (results.amount) setAmount(results.amount);
      else setMetaverseRooms([]);
    });
  }, [searchParams, page]);

  return (
    <>
      <Helmet>
        <title>Syncviz | Share 3D Models, Products and Environments</title>
        <meta
          name="description"
          content="Share 3D Models, Products or Environments live with anyone. Quickly you can allow others to interact and explore 3D while communicating with eachother. Syncviz helps to bring 3D sharing to everyone."
        />
      </Helmet>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Pagination
          count={Math.ceil(amount / 10)}
          page={page}
          onChange={handleChange}
        />
      </div>

      {metaverseRooms.length ? (
        <GridLayout>
          {metaverseRooms.map((room, i) => {
            return <Preview data={room} key={i} />;
          })}
        </GridLayout>
      ) : (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "block", textAlign: "center" }}>
            <MdOutlineDoNotDisturb size={20} />

            <Typography variant="caption" display="block">
              No Rooms Found
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}
