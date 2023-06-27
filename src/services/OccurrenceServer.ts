import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

type OccurrenceSendProps = Pick<User, 'uid'> & OccurrenceFormProps;

const createOccurrence = async (data: OccurrenceSendProps) => {
  try {
    console.log(data);
    const docRef = await addDoc(collection(db, "occurrences"), data);
    return docRef;
  } catch (e) {
    console.error("Erro ao criar ocorrência: ", e);
  }
};



export { createOccurrence };
