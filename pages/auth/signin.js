import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

const signin = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen text-center -mt-56 py-2">
        <div>
          <img
            className="w-80"
            src="https://links.papareact.com/ocw"
            alt="instagram"
          />
          <p className="text-xs italic">
            this not a real build its only made for educational purpose."By
            SXVD"
          </p>
        </div>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signin;
