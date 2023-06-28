import { db } from "../config/firebaseConfig";
import { collection, addDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { generateUUID } from "../utils/generateOccurenceId";

type OccurrenceCreateProps = & Pick<User, "uid"> & OccurrenceFormProps;

const createOccurrence = async (data: OccurrenceCreateProps) => {
  try {
    const docRef = await addDoc(collection(db, "occurrences"), {...data, occurrenceId: generateUUID(data.cep)});
    return docRef;
  } catch (e) {
    console.error("Erro ao criar ocorrência: ", e);
  }
};

const getOccurrenceByUser = async (data: User) => {
  try {
    const citiesRef = collection(db, "occurrences");
    const q = query(citiesRef, where("uid", "==", data.uid));
    const querySnapshot = await getDocs(q);
    const dados: any = []
    querySnapshot.forEach((doc) => {
      dados.push({...doc.data()});
  });
    return dados;
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
};

export { createOccurrence, getOccurrenceByUser };
