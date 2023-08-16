import Box from "@material-ui/core/Box";
import Map from "./Map";

export default function DrawRoof(props: any) {
  return (
    <Box styles={{ width: "100%" }}>
      <Map {...props}></Map>
    </Box>
  );
}
