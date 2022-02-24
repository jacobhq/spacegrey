import { ButtonGroup, Box, IconButton, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const Footer = () => (
    <Box as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
        <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-between" direction="row" align="center">
                <Text fontSize="sm" color="subtle">
                    &copy; {new Date().getFullYear()} Jacob Marshall. All rights reserved.
                </Text>
                <ButtonGroup variant="ghost">
                    <IconButton
                        as="a"
                        href="https://github.com/jacobhq/spacegrey"
                        aria-label="GitHub"
                        icon={<FaGithub fontSize="1.25rem" />}
                    />
                    <IconButton
                        as="a"
                        href="https://twitter.com/jhqcat"
                        aria-label="Twitter"
                        icon={<FaTwitter fontSize="1.25rem" />}
                    />
                </ButtonGroup>
            </Stack>
        </Stack>
    </Box>
)