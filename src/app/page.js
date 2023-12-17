'use client'
import React from 'react'
import { AppShell, NavLink, Badge, Flex, Title, Text, Card, Image, Group, Button } from '@mantine/core'
import Link from 'next/link'

const Home = () => {
    return (
        <>
            <AppShell.Navbar p={'md'}>
                <h1>Explore Our Services</h1>
                <NavLink
                    href="/detect"
                    label="Start detecting sign language"
                    description="Use or pre-trained model or try your custom model"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            1
                        </Badge>
                    }
                />
                <h1>Create Your Own Model</h1>
                <NavLink
                    href="/train/data-collection"
                    label="Collect your own data"
                    description="Collect data by yourself to train your own custom model"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            1
                        </Badge>
                    }
                />
                <NavLink
                    href="/train/model-train"
                    label="Train your own model"
                    description="Train your own model on your collected data and start using it"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            2
                        </Badge>
                    }
                />
            </AppShell.Navbar>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
            >
                <Title order={1} size={'xxx-large'}>GestureCom: Bridging the communication gap</Title>
                <Title order={1} size={'xx-large'}>Explore your world of sings with us!</Title>
                <Text>GestureCom is a privacy first, offline capable sing language transcriber. <br />It comes with a pre-build model to get started and also offers the user the ability to train their own model <br />All data is processed on device and it never leaves your own device.</Text>
                <Text>Enjoy the privacy focsed, offline (partial) experience on your own by checking the following features</Text>

                <Flex>
                    <NavLink
                        href="/detect"
                        label="Start detecting sign language"
                        description="Use or pre-trained model or try your custom model"
                        component={Link}
                        leftSection={
                            <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                                1
                            </Badge>
                        }
                    />
                    <NavLink
                        href="/train"
                        label="Start training your custom model"
                        description="Collect and train your own custom model."
                        component={Link}
                        leftSection={
                            <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                                2
                            </Badge>
                        }
                    />
                </Flex>
                <Title order={2}>Check it out by yourself here:</Title>
                <Image radius={'md'} src={'qrcode.svg'} w={'min(20rem,100svw)'} />
                <Title order={2}>Technologies used:</Title>
                <Flex
                    gap="md"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap">
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="tensorflowLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Tensorlfow (Python)</Text>
                            <Badge color="pink">Machine Learning</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used tensorflow-python to learn and train the initial 2 models
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="tensorflowLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Tensorlfow (Java Script)</Text>
                            <Badge color="pink">Machine Learning</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used tensorflow-js to facilate the training and running of both pre-built and custom model right in your device
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="mediapipeLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Mediapipe (Web)</Text>
                            <Badge color="pink">Landmark Detection</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used mediapie to detect both pose and handlandmark. Thiseliminates the requirement to store or process personally identifiable information by converting the images to points in the space.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="htmlLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>HTML</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used to make the skeliton of the site.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="jsLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Javascript</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Javascript is used to run and handel the used interaction in the web. This also facilates the intervace with webGl.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="cssLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>CSS</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Css is used to style the site and make it look prety
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="webglLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>WebGl</Text>
                            <Badge color="pink">Web|Computing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            WebGl is used to run the models in the machine directly. This eliminates the slow VM of JS and can handel large datasets with ease
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="gitLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Git</Text>
                            <Badge color="pink">Version Control</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Git is used to manage the different code versions and allowed to easily find and rectify the mistakes. It also acted as backup to safeguare the source code.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="pythonLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Python</Text>
                            <Badge color="pink">Computing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Python is used to explore the initial idea and train the first few models.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="nextjsLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>NextJS</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            NextJS is used to streamline the developed experience and facilate faster iteration
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="githubLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Github</Text>
                            <Badge color="pink">Version Control|Publishing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Github is used as remote code storace and as a hosting platform
                        </Text>
                    </Card>
                </Flex>
                <Text>Want to see the source code? See <a href="https://github.com/XotEmBotZ/singLanguageTranscriber">here</a></Text>
            </Flex>
        </>
    )
}

export default Home