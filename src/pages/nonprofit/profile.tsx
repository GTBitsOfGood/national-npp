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
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserProfile, updateUserProfile } from "src/actions/User";
import { states, countries } from "src/utils/constants";
import { showError, showInfo } from "src/utils/notifications";
import { Nonprofit, NonprofitUpdate, UserUpdate } from "src/utils/types";

interface FormData {
  name: string;
  phoneNumber: string;
  nonprofitName: string;
  contact: string; // A user id
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const contacts = ["Joyce Shen (joyce.chen@example.com)"];

  useEffect(() => {
    async function preloadData() {
      const user = await getUserProfile();
      const nonprofit = user.nonprofit as Nonprofit;

      reset({
        name: user.name,
        phoneNumber: user.phoneNum,
        nonprofitName: nonprofit.name,
        contact: nonprofit.contact,
        street: nonprofit.address.street,
        city: nonprofit.address.city,
        state: nonprofit.address.state,
        zipCode: nonprofit.address.zipCode,
        country: nonprofit.address.country,
        website: nonprofit.website ?? "",
        mission: nonprofit.mission ?? "",
      });
    }

    preloadData().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  }, [reset]);

  const submitData = async (data: FormData) => {
    // How else can you manipulate the objects passed to register on each input to ensure this data is safe?
    const userUpdate: UserUpdate = {
      name: data.name,
      phoneNum: data.phoneNumber,
    };

    const nonprofitUpdate: NonprofitUpdate = {
      name: data.nonprofitName,
      contact: data.contact,
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

    // Remember, what happens if the update fails?
    await updateUserProfile(userUpdate, nonprofitUpdate);

    showInfo("Your data has been saved successfully!");
  };

  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto">
        <VStack marginY={50}>
          <Text
            alignSelf="flex-start"
            pl={4}
            fontSize="xx-large"
            fontWeight={700}
          >
            Profile
          </Text>
          <form onSubmit={handleSubmit(submitData)}>
            <VStack
              minW={{ base: 425, md: 800 }}
              p={12}
              border="1px solid #BCC5D1"
              borderRadius={10}
              direction="column"
              backgroundColor="surface"
              spacing={10}
              align="stretch"
            >
              <Avatar alignSelf="center" width="80px" height="80px" />
              <VStack align="start" spacing={5}>
                <Text alignSelf="flex-start" fontSize="lg" fontWeight={700}>
                  User Information
                </Text>
                <Flex direction={{ base: "column", md: "row" }}>
                  <VStack
                    direction="column"
                    spacing={5}
                    mr={{ base: 0, md: 5 }}
                    mb={{ base: 5, md: 0 }}
                  >
                    <FormControl isInvalid={errors.name}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        id="name"
                        width={320}
                        {...register("name", {
                          required: "Please enter a name.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                  <FormControl isInvalid={errors.phoneNumber}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      width={320}
                      {...register("phoneNumber", {
                        required: "Please enter a phone number.",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </VStack>
              <VStack align="start" spacing={5}>
                <Text alignSelf="flex-start" fontSize="lg" fontWeight={700}>
                  Nonprofit Information
                </Text>
                <Flex direction={{ base: "column", md: "row" }}>
                  <VStack
                    direction="column"
                    spacing={5}
                    mr={{ base: 0, md: 5 }}
                    mb={{ base: 5, md: 0 }}
                  >
                    <FormControl isInvalid={errors.nonprofitName}>
                      <FormLabel>Nonprofit Name</FormLabel>
                      <Input
                        id="nonprofitName"
                        width={320}
                        {...register("nonprofitName", {
                          required: "Please enter a nonprofit name.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.nonprofitName && errors.nonprofitName.message}
                      </FormErrorMessage>
                    </FormControl>
                    <VStack spacing={3}>
                      <FormControl isInvalid={errors.street}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          id="street"
                          width={320}
                          placeholder="Street"
                          {...register("street", {
                            required: "Please enter a street.",
                          })}
                        />
                      </FormControl>
                      <FormControl isInvalid={errors.city}>
                        <Input
                          id="city"
                          width={320}
                          placeholder="City"
                          {...register("city", {
                            required: "Please enter a city.",
                          })}
                        />
                      </FormControl>
                      <HStack>
                        <FormControl isInvalid={errors.state}>
                          <Select
                            id="state"
                            width={190}
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
                        <FormControl isInvalid={errors.zipCode}>
                          <Input
                            id="zipCode"
                            width={120}
                            placeholder="Zip code"
                            {...register("zipCode", {
                              required: "Please enter a zip code.",
                            })}
                          />
                        </FormControl>
                      </HStack>
                      <FormControl isInvalid={errors.country}>
                        <Select
                          id="country"
                          width={320}
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
                  <VStack spacing={5}>
                    <FormControl isInvalid={errors.contact}>
                      <FormLabel>Contact</FormLabel>
                      <Select
                        id="contact"
                        width={320}
                        placeholder="Contact"
                        {...register("contact", {
                          required: "Please enter a contact.",
                        })}
                      >
                        {contacts.map((contact) => (
                          <option key={contact} value={contact}>
                            {contact}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.contact && errors.contact.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.website}>
                      <FormLabel>Website URL (Optional)</FormLabel>
                      <Input
                        id="website"
                        width={320}
                        {...register("website", {
                          required: "Please enter a website.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.website && errors.website.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                </Flex>
              </VStack>
              <FormControl isInvalid={errors.mission}>
                <FormLabel>Organization Mission (Optional)</FormLabel>
                <Textarea
                  id="mission"
                  resize="none"
                  {...register("mission", {
                    required: "Please enter a mission statement.",
                  })}
                />
                <FormErrorMessage>
                  {errors.mission && errors.mission.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                variant="primary"
                alignSelf="flex-end"
                size="md"
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitProfilePage;
