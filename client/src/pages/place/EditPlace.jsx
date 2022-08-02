import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import PlaceEditor from "../../components/PlaceEditor";

const EditPlace = () => {
  const [originData, setOriginData] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/place/${id}`)
      .then((res) => setOriginData(res.data))
      .catch((err) => alert(err));
  }, [id]);

  return <PlaceEditor isEdit={true} originData={originData} />;
};

export default EditPlace;
