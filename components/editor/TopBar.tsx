import React, { Fragment } from "react";
import Link from "next/link";
import { useUser } from "../../hooks";
import Router, { useRouter } from "next/router";
import { fetcher } from "../../utils";
import { useAppDispatch } from "../../store/hook";
import { update_modal } from "../../store/features/editorSlice";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import { LogoutIcon, SaveIcon, UserIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopBar = () => {
  const { user } = useUser();
  const router = useRouter();

  const { mutateUser } = useUser();

  const dispatch = useAppDispatch();

  function openModal() {
    dispatch(update_modal(true));
  }

  const logout = async () => {
    await mutateUser(fetcher("/api/auth/logout", "POST"));
    await Router.push("/");
  };

  return (
    <div
      style={{ height: "8vh" }}
      className="px-3 sm:px-7 flex justify-between items-center"
    >
      <div className="flex justify-center items-end">
        <Link href="/">
          <div className="flex justify-center items-end cursor-pointer">
            <img alt="Codetree" className="w-12" src="/identity/Codetree.png" />
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        {/* User is not login  =========================================== */}
        {!user?.isLoggedIn && (
          <div className="flex justify-center items-center">
            <Link href="/auth/login">
              <a className="nav_item">Login</a>
            </Link>{" "}
            <Link href="/auth/register">
              <div className="flex justify-center items-center mr-5 text-sm font-medium hover:bg-green-500 bg-green-400 px-4 py-1.5 rounded text-black tracking-wide cursor-pointer">
                <StarIcon className="w-5 h-5 mr-1.5" />
                <a>SIGN UP FREE</a>
              </div>
            </Link>
          </div>
        )}

        <div className="flex items-center">
          <div className="flex flex-col text-right">
            <div>{user?.profile?.data?.username}</div>
            <small className="text-gray-500">
              {user?.profile?.data?.status}
            </small>
          </div>
          <Menu
            as="div"
            className="relative inline-block text-left z-10 bg-transparent"
          >
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="bg-transparent pt-1 inline-flex justify-center items-center w-full px-4 bg-white text-sm font-medium text-gray-700 focus:outline-none  ">
                    {/* if user is in session return =========================================== */}
                    {user?.isLoggedIn && (
                      <img
                        className="rounded-full w-10 h-10 object-cover shadow-lg"
                        src={
                          user?.profile?.data?.profile || "/blank-profile.png"
                        }
                        alt="Profile image"
                      />
                    )}
                    {/*=========================================== */}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm cursor-pointer flex items-center"
                            )}
                            onClick={openModal}
                          >
                            <PlusIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                            New tree
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm cursor-pointer flex items-center"
                            )}
                          >
                            <SaveIcon
                              className="h-5 w-5 mr-1 text-gray-500"
                              aria-hidden="true"
                            />
                            Save
                          </a>
                        )}
                      </Menu.Item>
                    </div>

                    {/* if user is in session return  =========================================== */}
                    {user?.isLoggedIn && (
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer flex items-center"
                              )}
                              onClick={() => Router.push("/profile")}
                            >
                              <UserIcon
                                className="h-5 w-5 mr-1 text-gray-500"
                                aria-hidden="true"
                              />
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={logout}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer flex items-center"
                              )}
                            >
                              <LogoutIcon
                                className="h-5 w-5 mr-1 text-gray-500"
                                aria-hidden="true"
                              />
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    )}
                    {/*=========================================== */}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;