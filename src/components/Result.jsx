import Fail from "./Fail";
import Pass from "./Pass";

function Result(props) {
  if (props.marks > 50) {
    return <Pass marks={props.marks} color={props.color} name={props.name} />;
  } else {
    return <Fail marks={props.marks} color={props.color} name={props.name} />;
  }
}

export default Result;
