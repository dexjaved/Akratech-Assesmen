import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type propsType = {
  name: string;
  image: string;
  onDeleteClick: () => any;
  id: number;
};
const CardComponent = (props: propsType) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => props.onDeleteClick(props.id)}
          >
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default CardComponent;
