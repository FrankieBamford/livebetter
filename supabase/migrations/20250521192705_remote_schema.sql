create sequence "public"."categories_id_seq";

create sequence "public"."service_subtypes_id_seq";

create sequence "public"."service_types_id_seq";

create table "public"."Challenge/Condition_Category" (
    "id" integer not null default nextval('categories_id_seq'::regclass),
    "name" text not null,
    "slug" text,
    "common_search_examples" text
);


create table "public"."provider_categories" (
    "provider_id" uuid not null,
    "category_id" integer not null
);


create table "public"."providers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "email" text not null,
    "phone" text not null,
    "website_url" text,
    "slug" text,
    "location" text not null,
    "longatude" double precision,
    "latitiude" double precision,
    "is_online" boolean,
    "requires_referal" boolean,
    "open_now" boolean,
    "logo_url" text,
    "social_links" jsonb,
    "google_rating" double precision[],
    "google_reviews_count" bigint,
    "live_rating" double precision,
    "live_reviews_count" double precision,
    "is_verified" boolean,
    "created_at" timestamp with time zone,
    "modified_at" timestamp with time zone
);


create table "public"."service_subtypes" (
    "id" integer not null default nextval('service_subtypes_id_seq'::regclass),
    "service_type_id" integer not null,
    "name" text not null,
    "description" text
);


create table "public"."service_types_categories" (
    "id" integer not null default nextval('service_types_id_seq'::regclass),
    "name" text not null,
    "examples" text,
    "slug" text
);


create table "public"."users" (
    "id" uuid not null,
    "avatar_url" text,
    "user_id" text,
    "token_identifier" text not null,
    "image" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone,
    "email" text,
    "full_name" text
);


alter sequence "public"."categories_id_seq" owned by "public"."Challenge/Condition_Category"."id";

alter sequence "public"."service_subtypes_id_seq" owned by "public"."service_subtypes"."id";

alter sequence "public"."service_types_id_seq" owned by "public"."service_types_categories"."id";

CREATE UNIQUE INDEX categories_label_key ON public."Challenge/Condition_Category" USING btree (name);

CREATE UNIQUE INDEX categories_pkey ON public."Challenge/Condition_Category" USING btree (id);

CREATE UNIQUE INDEX provider_categories_pkey ON public.provider_categories USING btree (provider_id, category_id);

CREATE UNIQUE INDEX providers_email_key ON public.providers USING btree (email);

CREATE UNIQUE INDEX providers_phone_key ON public.providers USING btree (phone);

CREATE UNIQUE INDEX providers_pkey ON public.providers USING btree (id);

CREATE UNIQUE INDEX providers_website_key ON public.providers USING btree (website_url);

CREATE UNIQUE INDEX service_subtypes_pkey ON public.service_subtypes USING btree (id);

CREATE UNIQUE INDEX service_types_pkey ON public.service_types_categories USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_user_id_key ON public.users USING btree (user_id);

alter table "public"."Challenge/Condition_Category" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."provider_categories" add constraint "provider_categories_pkey" PRIMARY KEY using index "provider_categories_pkey";

alter table "public"."providers" add constraint "providers_pkey" PRIMARY KEY using index "providers_pkey";

alter table "public"."service_subtypes" add constraint "service_subtypes_pkey" PRIMARY KEY using index "service_subtypes_pkey";

alter table "public"."service_types_categories" add constraint "service_types_pkey" PRIMARY KEY using index "service_types_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."Challenge/Condition_Category" add constraint "categories_label_key" UNIQUE using index "categories_label_key";

alter table "public"."provider_categories" add constraint "provider_categories_category_id_fkey" FOREIGN KEY (category_id) REFERENCES "Challenge/Condition_Category"(id) ON DELETE CASCADE not valid;

alter table "public"."provider_categories" validate constraint "provider_categories_category_id_fkey";

alter table "public"."provider_categories" add constraint "provider_categories_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE not valid;

alter table "public"."provider_categories" validate constraint "provider_categories_provider_id_fkey";

alter table "public"."providers" add constraint "providers_email_key" UNIQUE using index "providers_email_key";

alter table "public"."providers" add constraint "providers_phone_key" UNIQUE using index "providers_phone_key";

alter table "public"."providers" add constraint "providers_website_key" UNIQUE using index "providers_website_key";

alter table "public"."service_subtypes" add constraint "service_subtypes_service_type_id_fkey" FOREIGN KEY (service_type_id) REFERENCES service_types_categories(id) not valid;

alter table "public"."service_subtypes" validate constraint "service_subtypes_service_type_id_fkey";

alter table "public"."users" add constraint "users_user_id_key" UNIQUE using index "users_user_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.users (
    id,
    user_id,
    email,
    name,
    full_name,
    avatar_url,
    token_identifier,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.id::text,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_user_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.users
  SET
    email = NEW.email,
    name = NEW.raw_user_meta_data->>'name',
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NEW.updated_at
  WHERE user_id = NEW.id::text;
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."Challenge/Condition_Category" to "anon";

grant insert on table "public"."Challenge/Condition_Category" to "anon";

grant references on table "public"."Challenge/Condition_Category" to "anon";

grant select on table "public"."Challenge/Condition_Category" to "anon";

grant trigger on table "public"."Challenge/Condition_Category" to "anon";

grant truncate on table "public"."Challenge/Condition_Category" to "anon";

grant update on table "public"."Challenge/Condition_Category" to "anon";

grant delete on table "public"."Challenge/Condition_Category" to "authenticated";

grant insert on table "public"."Challenge/Condition_Category" to "authenticated";

grant references on table "public"."Challenge/Condition_Category" to "authenticated";

grant select on table "public"."Challenge/Condition_Category" to "authenticated";

grant trigger on table "public"."Challenge/Condition_Category" to "authenticated";

grant truncate on table "public"."Challenge/Condition_Category" to "authenticated";

grant update on table "public"."Challenge/Condition_Category" to "authenticated";

grant delete on table "public"."Challenge/Condition_Category" to "service_role";

grant insert on table "public"."Challenge/Condition_Category" to "service_role";

grant references on table "public"."Challenge/Condition_Category" to "service_role";

grant select on table "public"."Challenge/Condition_Category" to "service_role";

grant trigger on table "public"."Challenge/Condition_Category" to "service_role";

grant truncate on table "public"."Challenge/Condition_Category" to "service_role";

grant update on table "public"."Challenge/Condition_Category" to "service_role";

grant delete on table "public"."provider_categories" to "anon";

grant insert on table "public"."provider_categories" to "anon";

grant references on table "public"."provider_categories" to "anon";

grant select on table "public"."provider_categories" to "anon";

grant trigger on table "public"."provider_categories" to "anon";

grant truncate on table "public"."provider_categories" to "anon";

grant update on table "public"."provider_categories" to "anon";

grant delete on table "public"."provider_categories" to "authenticated";

grant insert on table "public"."provider_categories" to "authenticated";

grant references on table "public"."provider_categories" to "authenticated";

grant select on table "public"."provider_categories" to "authenticated";

grant trigger on table "public"."provider_categories" to "authenticated";

grant truncate on table "public"."provider_categories" to "authenticated";

grant update on table "public"."provider_categories" to "authenticated";

grant delete on table "public"."provider_categories" to "service_role";

grant insert on table "public"."provider_categories" to "service_role";

grant references on table "public"."provider_categories" to "service_role";

grant select on table "public"."provider_categories" to "service_role";

grant trigger on table "public"."provider_categories" to "service_role";

grant truncate on table "public"."provider_categories" to "service_role";

grant update on table "public"."provider_categories" to "service_role";

grant delete on table "public"."providers" to "anon";

grant insert on table "public"."providers" to "anon";

grant references on table "public"."providers" to "anon";

grant select on table "public"."providers" to "anon";

grant trigger on table "public"."providers" to "anon";

grant truncate on table "public"."providers" to "anon";

grant update on table "public"."providers" to "anon";

grant delete on table "public"."providers" to "authenticated";

grant insert on table "public"."providers" to "authenticated";

grant references on table "public"."providers" to "authenticated";

grant select on table "public"."providers" to "authenticated";

grant trigger on table "public"."providers" to "authenticated";

grant truncate on table "public"."providers" to "authenticated";

grant update on table "public"."providers" to "authenticated";

grant delete on table "public"."providers" to "service_role";

grant insert on table "public"."providers" to "service_role";

grant references on table "public"."providers" to "service_role";

grant select on table "public"."providers" to "service_role";

grant trigger on table "public"."providers" to "service_role";

grant truncate on table "public"."providers" to "service_role";

grant update on table "public"."providers" to "service_role";

grant delete on table "public"."service_subtypes" to "anon";

grant insert on table "public"."service_subtypes" to "anon";

grant references on table "public"."service_subtypes" to "anon";

grant select on table "public"."service_subtypes" to "anon";

grant trigger on table "public"."service_subtypes" to "anon";

grant truncate on table "public"."service_subtypes" to "anon";

grant update on table "public"."service_subtypes" to "anon";

grant delete on table "public"."service_subtypes" to "authenticated";

grant insert on table "public"."service_subtypes" to "authenticated";

grant references on table "public"."service_subtypes" to "authenticated";

grant select on table "public"."service_subtypes" to "authenticated";

grant trigger on table "public"."service_subtypes" to "authenticated";

grant truncate on table "public"."service_subtypes" to "authenticated";

grant update on table "public"."service_subtypes" to "authenticated";

grant delete on table "public"."service_subtypes" to "service_role";

grant insert on table "public"."service_subtypes" to "service_role";

grant references on table "public"."service_subtypes" to "service_role";

grant select on table "public"."service_subtypes" to "service_role";

grant trigger on table "public"."service_subtypes" to "service_role";

grant truncate on table "public"."service_subtypes" to "service_role";

grant update on table "public"."service_subtypes" to "service_role";

grant delete on table "public"."service_types_categories" to "anon";

grant insert on table "public"."service_types_categories" to "anon";

grant references on table "public"."service_types_categories" to "anon";

grant select on table "public"."service_types_categories" to "anon";

grant trigger on table "public"."service_types_categories" to "anon";

grant truncate on table "public"."service_types_categories" to "anon";

grant update on table "public"."service_types_categories" to "anon";

grant delete on table "public"."service_types_categories" to "authenticated";

grant insert on table "public"."service_types_categories" to "authenticated";

grant references on table "public"."service_types_categories" to "authenticated";

grant select on table "public"."service_types_categories" to "authenticated";

grant trigger on table "public"."service_types_categories" to "authenticated";

grant truncate on table "public"."service_types_categories" to "authenticated";

grant update on table "public"."service_types_categories" to "authenticated";

grant delete on table "public"."service_types_categories" to "service_role";

grant insert on table "public"."service_types_categories" to "service_role";

grant references on table "public"."service_types_categories" to "service_role";

grant select on table "public"."service_types_categories" to "service_role";

grant trigger on table "public"."service_types_categories" to "service_role";

grant truncate on table "public"."service_types_categories" to "service_role";

grant update on table "public"."service_types_categories" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Users can update their own data"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view own data"
on "public"."users"
as permissive
for select
to public
using (((auth.uid())::text = user_id));


create policy "Users can view their own data"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));



