import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VirtualSpace from "../classes/virtual-space";
import GridLayout from "../template/layout/grid-layout";
import Preview from "../components/preview";
import { Typography } from "@mui/material";
import { MdOutlineDoNotDisturb } from "react-icons/md";

export default function SearchVirtualPage() {
  const [searchParams] = useSearchParams();
  const [metaverseRooms, setMetaverseRooms] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q");
    VirtualSpace.searchMetaverseRooms(q).then((results) => {
      if (results) setMetaverseRooms(results);
      else setMetaverseRooms([]);
    });
  }, [searchParams]);

  return (
    <>
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
