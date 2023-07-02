// import React from 'react';

// const EditProfileModal = ({user}) => {
//   return (
//     <>
//       {/* Personal Details Modal */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         <Box
//           sx={{
//             width: '100%',
//             maxWidth: 400,
//             bgcolor: 'rgba(200, 200, 200, 0.6)',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: '8px',
//             color: 'white'
//           }}
//         >
//           <Typography variant="h6" align="center" gutterBottom>
//             Modify Personal Details
//             <ModeIcon sx={{ ml: 1 }} />
//           </Typography>
//           <TextField
//             label="First Name"
//             fullWidth
//             value={firstName}
//             onChange={e => setFirstName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Last Name"
//             fullWidth
//             value={lastName}
//             onChange={e => setLastName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             value={phoneNumber}
//             onChange={e => setPhoneNumber(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Email Address"
//             fullWidth
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Confirm Password"
//             type="password"
//             fullWidth
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Picture"
//             fullWidth
//             value={picture}
//             onChange={e => setPicture(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" onClick={handleSavePersonalDetails}>
//             Save
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default EditProfileModal;
