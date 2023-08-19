import { Button } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <div className="not-found h-[100vh] flex flex-col justify-start items-center">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        height={'700px'}
        width={'700px'}
      />
      <h1 className="motto text-4xl font-extrabold font-[roboto] mt-[-140px] pb-5 flex text-start">
        <span className="text-not-found text-7xl">404</span>
        <span className="text-4xl">Not Found</span>
      </h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => (window.location = '/')}
      >
        Back to main
      </Button>
    </div>
  );
};
