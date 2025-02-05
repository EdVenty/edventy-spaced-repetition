import { DocumentSnapshot } from "firebase/firestore";
import { IQuiz } from "../entities/Quiz";


export function firestoreDocToQuiz(doc: DocumentSnapshot): IQuiz {
  const data = {...doc.data(), id: doc.id} as IQuiz;
  return data;
}