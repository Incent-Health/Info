#!/usr/bin/python

# pip install ecdsa
# pip install pysha3

#
#Python script to generate Ethereum address, private key, and public key
#NOTE: run in python3 for hex()
#

from ecdsa import SigningKey, SECP256k1
import sha3
import sys

print(sys.version)

keccak = sha3.keccak_256()

priv = SigningKey.generate(curve=SECP256k1)
pub = priv.get_verifying_key().to_string()

keccak.update(pub)
address = keccak.hexdigest()[24:]

print("Private key:", priv.to_string().hex())
print("Public key: ", pub.hex()) #excludes 0x04 leading byte
print("Address:     0x" + address)
