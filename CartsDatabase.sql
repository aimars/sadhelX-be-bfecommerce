PGDMP     	                
    y            CartsDatabase    14.0    14.0 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24596    CartsDatabase    DATABASE     s   CREATE DATABASE "CartsDatabase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "CartsDatabase";
                postgres    false            �            1259    24597    carts    TABLE     )  CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    status character varying(30),
    checkout_date timestamp with time zone,
    payment_date date,
    user_id integer NOT NULL,
    transaction_code character(18),
    payment_method character varying(25),
    total integer NOT NULL
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    24602    order_items    TABLE     �   CREATE TABLE public.order_items (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    qty integer,
    subtotal int4range NOT NULL
);
    DROP TABLE public.order_items;
       public         heap    postgres    false            �          0    24597    carts 
   TABLE DATA              COPY public.carts (cart_id, status, checkout_date, payment_date, user_id, transaction_code, payment_method, total) FROM stdin;
    public          postgres    false    209   �
       �          0    24602    order_items 
   TABLE DATA           I   COPY public.order_items (cart_id, product_id, qty, subtotal) FROM stdin;
    public          postgres    false    210   !       `           2606    24601    carts carts_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    209            a           2606    24605    order_items cart_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 =   ALTER TABLE ONLY public.order_items DROP CONSTRAINT cart_id;
       public          postgres    false    209    210    3168            �   a   x�e̱@@��z�)�2�{:��F����KG"��_M�	M˾Ɣ�F
�R�c��*�[HIL���o���@M �����|���i��͕s� $Of      �      x������ � �     