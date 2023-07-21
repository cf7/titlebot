import Link from "next/link";

export const InProgressMain = () => {
  return (
    <>
      <div>
        <p>A basic page for noting features and fixes still in progress:</p>
        <h5>Edge Case</h5>
        <p>for urls like this one [https://react-bootstrap-v3.netlify.app/]</p>
        <p>
          there is actually a valid url substring that is not actually a real
          url, (and not the complete url)
        </p>
        <p>https://react-bootstrap-v3.net</p>
        <div>-------</div>
        <Link href="/">Home</Link>
      </div>
    </>
  );
};
