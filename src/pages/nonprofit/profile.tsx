import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nonprofitUpdateNonprofit } from "src/actions/Nonprofit";
import {
  nonprofitGetUser,
  nonprofitGetUsers,
  nonprofitUpdateUser,
} from "src/actions/User";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
import { states, countries } from "src/utils/constants";
import { showError, showInfo } from "src/utils/notifications";
import {
  Contact,
  Nonprofit,
  NonprofitUpdateNonprofit,
  NonprofitUpdateUser,
  User,
} from "src/utils/types";
import {
  maxInput,
  maxTextArea,
  phoneNumberPattern,
  zipCodePattern,
} from "src/utils/validation";

interface FormData {
  name: string;
  phoneNumber: string;
  nonprofitName: string;
  contact: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website: string;
  mission: string;
}

function NonprofitProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const router = useRouter();

  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const user = await nonprofitGetUser();
      const nonprofit = user.nonprofit as Nonprofit;

      const contacts: User[] = await nonprofitGetUsers();
      setContactList(
        contacts.map((user) => {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        })
      );

      reset({
        name: user.name,
        phoneNumber: user.phoneNum ?? "",
        nonprofitName: nonprofit.name,
        contact: nonprofit.contact.toString(),
        street: nonprofit.address.street,
        city: nonprofit.address.city,
        state: nonprofit.address.state,
        zipCode: nonprofit.address.zipCode,
        country: nonprofit.address.country,
        website: nonprofit.website ?? "",
        mission: nonprofit.mission ?? "",
      });
    }

    setLoading(true);

    getProfile()
      .then(() => setLoading(false))
      .catch((e) => {
        const error = e as Error;
        showError(error.message);
        router.back();
      });
  }, [reset, router]);

  const saveProfile = async (data: FormData) => {
    setSaving(true);

    const userUpdate: NonprofitUpdateUser = {
      name: data.name,
      phoneNum: data.phoneNumber,
    };

    const nonprofitUpdate: NonprofitUpdateNonprofit = {
      name: data.nonprofitName,
      contact: Types.ObjectId(data.contact),
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      website: data.website,
      mission: data.mission,
    };

    try {
      const user = await nonprofitUpdateUser(userUpdate);
      const nonprofit = user.nonprofit as Nonprofit;
      await nonprofitUpdateNonprofit(nonprofit._id.toString(), nonprofitUpdate);
      showInfo("Successfully updated profile.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }

    setSaving(false);
  };

  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Flex margin="auto">
          <form onSubmit={handleSubmit(saveProfile)}>
            <VStack
              maxWidth="850px"
              marginY="40px"
              padding="40px 60px"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              backgroundColor="surface"
              spacing="40px"
              align="stretch"
            >
              <Avatar alignSelf="center" width="90px" height="90px" />
              <VStack align="stretch" spacing="20px">
                <Text alignSelf="flex-start" fontSize="lg" fontWeight="bold">
                  User Information
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing="20px">
                  <FormControl isInvalid={Boolean(errors.name)}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      id="name"
                      maxLength={maxInput}
                      {...register("name", {
                        required: "Please enter a name.",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.phoneNumber)}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      placeholder="XXX-XXX-XXXX"
                      {...register("phoneNumber", {
                        pattern: {
                          value: phoneNumberPattern,
                          message: "Please format phone number correctly.",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </VStack>
              <VStack align="stretch" spacing="20px">
                <Text alignSelf="flex-start" fontSize="lg" fontWeight="bold">
                  Nonprofit Information
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing="20px">
                  <VStack spacing="20px" flex="1">
                    <FormControl isInvalid={Boolean(errors.nonprofitName)}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        id="nonprofitName"
                        maxLength={maxInput}
                        {...register("nonprofitName", {
                          required: "Please enter a nonprofit name.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.nonprofitName && errors.nonprofitName.message}
                      </FormErrorMessage>
                    </FormControl>
                    <VStack>
                      <FormControl isInvalid={Boolean(errors.street)}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          id="street"
                          maxLength={maxInput}
                          placeholder="Street"
                          {...register("street", {
                            required: "Please enter a street.",
                          })}
                        />
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.city)}>
                        <Input
                          id="city"
                          maxLength={maxInput}
                          placeholder="City"
                          {...register("city", {
                            required: "Please enter a city.",
                          })}
                        />
                      </FormControl>
                      <HStack>
                        <FormControl flex="2" isInvalid={Boolean(errors.state)}>
                          <Select
                            id="state"
                            placeholder="State"
                            {...register("state", {
                              required: "Please enter a state.",
                            })}
                          >
                            {states.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          flex="1"
                          isInvalid={Boolean(errors.zipCode)}
                        >
                          <Input
                            id="zipCode"
                            placeholder="Zip code"
                            {...register("zipCode", {
                              required: "Please enter a zip code.",
                              pattern: {
                                value: zipCodePattern,
                                message: "Please enter a valid zip code.",
                              },
                            })}
                          />
                        </FormControl>
                      </HStack>
                      <FormControl isInvalid={Boolean(errors.country)}>
                        <Select
                          id="country"
                          placeholder="Country"
                          {...register("country", {
                            required: "Please enter a country.",
                          })}
                        >
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {(errors.street && errors.street.message) ||
                            (errors.city && errors.city.message) ||
                            (errors.state && errors.state.message) ||
                            (errors.zipCode && errors.zipCode.message) ||
                            (errors.country && errors.country.message)}
                        </FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </VStack>
                  <VStack spacing="20px" flex="1">
                    <FormControl isInvalid={Boolean(errors.contact)}>
                      <FormLabel>Contact</FormLabel>
                      <Select
                        id="contact"
                        placeholder="Contact"
                        {...register("contact", {
                          required: "Please select a contact.",
                          onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                            e.target.value,
                        })}
                      >
                        {contactList.map(({ id, name, email }) => (
                          <option key={id} value={id}>
                            {`${name} (${email})`}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.contact && errors.contact.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.website)}>
                      <FormLabel>Website</FormLabel>
                      <Input
                        id="website"
                        maxLength={maxInput}
                        {...register("website")}
                      />
                      <FormErrorMessage>
                        {errors.website && errors.website.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                </Stack>
                <FormControl isInvalid={Boolean(errors.mission)}>
                  <FormLabel>Mission</FormLabel>
                  <Textarea
                    id="mission"
                    resize="none"
                    maxLength={maxTextArea}
                    {...register("mission")}
                  />
                  <FormErrorMessage>
                    {errors.mission && errors.mission.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <Button
                type="submit"
                variant="primary"
                alignSelf="flex-end"
                size="md"
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        </Flex>
      )}
    </Flex>
  );
}

export default NonprofitProfilePage;
