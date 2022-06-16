import { BACKEND } from "../env";

const imageAddress = (name) => {
  return `url(${BACKEND}/images/${name})`;
};

export default imageAddress;
