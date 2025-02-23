import { connect } from "../database/conn";

export default async function About() {
  const conn = await connect();
  console.log(conn);

  return <section>About</section>;
}
