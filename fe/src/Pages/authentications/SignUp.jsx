import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import SirestoImage from '../../assets/img/siresto.png';
import { useState } from 'react';
import { addUser } from '../../api/user';
import Swal from 'sweetalert2';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      addUser({
        username,
        firstName,
        lastName,
        password,
        email,
        address,
      })
        .then((response) => {
          if (response !== undefined) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registrasi Berhasil',
              showConfirmButton: false,
              timer: 1000,
            });

            setTimeout(() => {
              window.location = '/login';
            }, 1500);
          }
        })
        .catch(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Registrasi Gagal',
            showConfirmButton: false,
            timer: 1000,
          });
        });
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="flex">
      <div className="image w-1/2 h-[100vh]">
        <img src={SirestoImage} alt="" className="h-[100vh] pl-5" />
      </div>
      <div className="form w-2/3 pr-10">
        <div className="py-16">
          <h1 className="logo text-5xl text-dark-green pb-4">Siresto</h1>
          <p className="motto">Hope you enjoy with Siresto</p>
        </div>
        <form className="flex gap-5" onSubmit={handleSubmit}>
          <div className="1 w-1/2">
            <div className="username flex flex-col gap-2 pb-5">
              <label htmlFor="">Username</label>
              <TextField
                required
                id="outlined-required"
                label="Required"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="fisrtname flex flex-col gap-2 pb-5">
              <label htmlFor="">Fisrtname</label>
              <TextField
                required
                id="outlined-required"
                label="Required"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="lastname flex flex-col gap-2 pb-5">
              <label htmlFor="">Lastname</label>
              <TextField
                id="outlined-required"
                label="Optional"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="email flex flex-col gap-2 pb-5">
              <label htmlFor="">Email</label>
              <TextField
                required
                id="outlined-required"
                label="Required"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="warning"
              className="w-full h-14"
              onClick={handlerSubmit}
            >
              Register
            </Button>
          </div>
          <div className="2 w-1/2">
            <div className="address flex flex-col gap-2 pb-5">
              <label htmlFor="">Address</label>
              <TextField
                id="outlined-multiline-flexible"
                label="Required"
                multiline
                required
                maxRows={4}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="password flex flex-col gap-2 pb-5">
              <label htmlFor="">Password</label>
              <TextField
                required
                id="outlined-required"
                label="Required"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="confirm-password flex flex-col gap-2 pb-5">
              <label htmlFor="">Confirm Password</label>
              <TextField
                required
                error={confirmPassword !== password}
                id={`outlined-${
                  confirmPassword !== password ? 'error' : 'outlined'
                }`}
                label="Required"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
