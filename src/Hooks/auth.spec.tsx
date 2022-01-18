import "jest-fetch-mock";

import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";

import { AuthProvider, useAuth } from "./auth";

jest.mock("expo-auth-session");

fetchMock.enableMocks();

describe("Hook: Auth", () => {
  it("should be able to sign in with Google existing account", async () => {
    const googleMocked = mocked(startAsync as any);

    // prevent reuse of mocks
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "google_token",
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "email.email@email.com",
        given_name: "User",
        picture: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
    expect(result.current.user.id).toEqual("any_id");
    expect(result.current.user.email).toEqual("email.email@email.com");
    expect(result.current.user.name).toEqual("User");
    expect(result.current.user.photo).toEqual("any_photo.png");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);

    // prevent reuse of mocks
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.id).not.toHaveProperty("id");
  });
});
