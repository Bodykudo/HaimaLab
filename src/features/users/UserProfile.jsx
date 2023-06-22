/* eslint-disable react/prop-types */
import { styled, css } from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import {
  faCalendar,
  faCircleInfo,
  faCommentMedical,
  faDroplet,
  faFileMedical,
  faIdCard,
  faMars,
  faNotesMedical,
  faPhone,
  faTablets,
  faVenus,
  faVial,
  faVirus,
} from '@fortawesome/free-solid-svg-icons';
import DataRow from '../../ui/DataRow';
import Spinner from '../../ui/Spinner';
import { useUser, useUserProfile } from '../authentication/useUser';
import UpdateUserDataForm from '../authentication/UpdateUserDataForm';
import { calculateAge, capitalize } from '../../utils/helpers';
import UpdatePasswordForm from '../authentication/UpdatePasswordForm';
import Stacked from '../../ui/Stacked';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { useDeleteUser } from './useDeleteUser';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateUserForm from './CreateUserForm';
import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-hot-toast';

const ProfileRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  gap: 2.4rem;

  ${(props) =>
    props.role === 'patient' &&
    css`
      grid-template-columns: 1fr 1fr 1fr;

      @media (max-width: 1045px) {
        grid-template-columns: 1.5fr 1fr;
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    `};

  ${(props) =>
    props.role === 'user' &&
    css`
      grid-template-columns: 1.5fr 1fr;

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    `};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  ${(props) =>
    props.role === 'patient' &&
    css`
      @media (max-width: 1045px) {
        grid-column: span 2;
      }

      @media (max-width: 576px) {
        grid-column: 1;
      }
    `};

  ${(props) =>
    props.role === 'user' &&
    css`
      @media (max-width: 1045px) {
      }

      @media (max-width: 576px) {
      }
    `};
`;

const Avatar = styled.img`
  display: block;
  width: 20rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const handleCopy = (text) => {
  clipboardCopy(text)
    .then(() => {
      toast.success(
        'Prompt copied to your clipboard\nSend it to Apollo to help you'
      );
    })
    .catch(() => {
      toast.error('Prompt not copied to clipboard\nPlease try again');
    });
};

function UserProfile() {
  const { user, isLoading } = useUserProfile();
  const { user: userAuth } = useUser();
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!user) navigate('/error');
  document.title = `HaimaLab - ${user.fullName}`;

  const sex = user.sex;
  const userRole = user.userRole;
  const currentRole = userAuth?.user_metadata?.userRole;
  const isSuper = userAuth?.user_metadata?.isSuper;

  function handlePrompt() {
    if (currentRole === 'patient') {
      const message = `Good day, Apollo, I am a ${sex} patient, and my age is ${calculateAge(
        user.birthDate
      )}, and my blood type is ${user.bloodType}, my Hemoglobin level is ${
        user.HB
      } g/dL, and my Hematocrit level is ${user.HCT}%, my RBCs count is ${
        user.RBC
      }x10^6/µL, wihle WBCs is ${user.WBC}x10^6/µL, and Platelet count is ${
        user.PLT
      }x10^3/µL. My mean corpuscular volume (MCV) is ${
        user.MCV
      } fl, mean corpuscular hemoglobin (MCH) is ${
        user.MCH
      } pg, and mean corpuscular hemoglobin concentration (MCHC) is ${
        user.MCHC
      } g/dL. Can you help me know if something is wrong with me, and what cautions should I take?`;
      handleCopy(message);
    } else {
      let message = `Good day, Apollo. I have a patient whose age is ${calculateAge(
        user.birthDate
      )}, and his blood type is ${user.bloodType}, his Hemoglobin level is ${
        user.HB
      } g/dL, and his Hematocrit level is ${user.HCT}%, his RBCs count is ${
        user.RBC
      }x10^6/µL, wihle WBCs is ${user.WBC}x10^6/µL, and Platelet count is ${
        user.PLT
      }x10^3/µL. His mean corpuscular volume (MCV) is ${
        user.MCV
      } fl, mean corpuscular hemoglobin (MCH) is ${
        user.MCH
      } pg, and mean corpuscular hemoglobin concentration (MCHC) is ${
        user.MCHC
      } g/dL. Can you help me diagnose this patient based on the provided details?`;

      if (sex === 'female') message = message.replace(/his/g, 'her');

      handleCopy(message);
    }
  }

  const healthRow = (
    <Row>
      <DataRow icon={faDroplet} color="#df0101" value={user.bloodType || '–'} />

      <DataRow
        icon={faDroplet}
        color="#df0101"
        label="RBCs"
        value={user.WBC ? `${user.RBC} x10^6/µL` : '–'}
      />

      <DataRow
        icon={faDroplet}
        color="#7b808a"
        label="WBCs"
        value={user.WBC ? `${user.WBC} x10^6/µL` : '–'}
      />

      <DataRow
        icon={faVirus}
        color="#FF98C9"
        label="Plt"
        value={user.PLT ? `${user.PLT} x10^3/µL` : '–'}
      />

      <DataRow
        icon={faNotesMedical}
        color="#df0101"
        label="MCV"
        value={user.MCV ? `${user.MCV} fl` : '–'}
      />

      <DataRow
        icon={faCommentMedical}
        color="#0f35cc"
        label="MCH"
        value={user.MCH ? `${user.MCH} pg` : '–'}
      />

      <DataRow
        icon={faFileMedical}
        color="#900fcc"
        label="MCHC"
        value={user.MCHC ? `${user.MCHC} g/dL` : '–'}
      />
    </Row>
  );

  return (
    <>
      <Heading as="h1">
        {capitalize(userRole)}
        &#39;s profile
      </Heading>

      <ProfileRow role={userRole === 'patient' ? 'patient' : 'user'}>
        <Column role={userRole === 'patient' ? 'patient' : 'user'}>
          <Avatar src={user.avatar} />
          <Stacked align="center">
            <Heading as="h2">{user.fullName}</Heading>
            <span>{user.email}</span>
          </Stacked>
        </Column>

        <Row>
          <DataRow
            icon={faIdCard}
            color="#AC9362"
            value={user.nationalId || '–'}
          />
          <DataRow icon={faPhone} color="#3aa932" value={user.mobile || '–'} />
          <DataRow
            icon={faCircleInfo}
            color="#27bace"
            value={`${calculateAge(user.birthDate)} years old`}
          />
          <DataRow icon={faCalendar} color="#AC9362" value={user.birthDate} />
          <DataRow
            icon={sex === 'male' ? faMars : faVenus}
            color={sex === 'male' ? '#0f35cc' : '#FF98C9'}
            value={capitalize(sex)}
          />

          {userRole === 'patient' && (
            <DataRow
              icon={faTablets}
              color="#0f35cc"
              label="Hemoglobin (Hb)"
              value={user.HB ? `${user.HB} g/dL` : '–'}
            />
          )}
          {userRole === 'patient' && (
            <DataRow
              icon={faVial}
              color="#900fcc"
              label="Hematocrit (Hct)"
              value={user.HCT ? `${user.HCT}%` : '–'}
            />
          )}
        </Row>

        {userRole === 'patient' && healthRow}
      </ProfileRow>

      {user.userId === userAuth?.user_metadata?.userId && (
        <>
          <Heading as="h1">Update your account</Heading>
          <Row>
            <Heading as="h3">Update user data</Heading>
            <UpdateUserDataForm
              userId={user.id}
              email={user.email}
              fullName={user.fullName}
              avatar={user.avatar}
            />
          </Row>

          <Row>
            <Heading as="h3">Update password</Heading>
            <UpdatePasswordForm />
          </Row>
        </>
      )}

      {userAuth?.user_metadata?.userRole === 'patient' && (
        <ButtonGroup>
          <Button onClick={handlePrompt}>Prompt</Button>
        </ButtonGroup>
      )}

      {userAuth?.user_metadata?.userRole !== 'patient' && (
        <Row>
          <Modal>
            <ButtonGroup>
              <Button type="reset" variation="secondary" onClick={moveBack}>
                Back
              </Button>
              {isSuper && user.userId !== userAuth?.user_metadata?.userId && (
                <Modal.Open opens="delete">
                  <Button type="reset" variation="danger">
                    Delete
                  </Button>
                </Modal.Open>
              )}

              {userRole === 'patient' && currentRole !== 'admin' && (
                <Button onClick={handlePrompt}>Prompt</Button>
              )}

              {userRole !== 'admin' ? (
                currentRole === 'admin' ||
                (currentRole === 'doctor' && userRole === 'patient') ? (
                  <Modal.Open opens="edit">
                    <Button>Edit</Button>
                  </Modal.Open>
                ) : null
              ) : (
                isSuper && (
                  <Modal.Open opens="edit">
                    <Button>Edit</Button>
                  </Modal.Open>
                )
              )}
            </ButtonGroup>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="user"
                onConfirm={() => deleteUser(user.id)}
              />
            </Modal.Window>

            <Modal.Window name="edit">
              {userRole !== 'patient' ? (
                <CreateUserForm userToEdit={user} userRole={userRole} />
              ) : currentRole === 'admin' ? (
                <CreateUserForm userToEdit={user} userRole={userRole} />
              ) : (
                <CreateUserForm
                  userToEdit={user}
                  userRole={userRole}
                  healthRecords={true}
                />
              )}
            </Modal.Window>
          </Modal>
        </Row>
      )}
    </>
  );
}

export default UserProfile;
